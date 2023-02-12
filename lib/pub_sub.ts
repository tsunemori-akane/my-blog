export default class PubSub {
  constructor() {
    this.messages = {};
    this.lastUid = -1;
  }

  #throwException(e) {
    return function() {
      throw e;
    }
  }

  #callSubscriber(subscriber, msg, data) {
    try {
      subscriber(msg, data);
    } catch(err) {
      setTimeout(this.#throwException(err), 0)
    }
  }

  #deliverMessage(msg, data) {
    var subscribers = this.messages[msg];
    var _this = this
    return function() {
      for(let s in subscribers) {
        if( Object.prototype.hasOwnProperty.call(subscribers, s)) {
          _this.#callSubscriber(subscribers[s], msg, data);
        }
      }
    }
  }

  #messageHasSubcribers(msg) {
    var topic = String(msg),
        found = Object.prototype.hasOwnProperty.call(this.messages, topic)
    return found;
  }

  #publishMsg(msg, data, async) {
    var deliver = this.#deliverMessage(msg, data);
    var hasSubscribers = this.#messageHasSubcribers(msg);
    if(!hasSubscribers) {
      return false;
    }
    if(async === true) {
      setTimeout(deliver, 0)
    } else {
      deliver()
    }
    return true;
  }

  #clearSubscriptions(topic) {
    var m;
    for(m in this.messages){
      if(Object.prototype.hasOwnProperty.call(this.messages, m) && m.indexOf(topic) === 0){
        delete this.messages[m];
      }
    }
  }

  publish(msg, data) {
    this.#publishMsg(msg, data, false)
  }
  publishAsync(msg, data) {
    this.#publishMsg(msg, data, true)
  }
  subscribe(msg, func) {
    if(typeof func !== 'function') {
      return false;
    }

    // msg is not registed
    if( !Object.prototype.hasOwnProperty.call(this.messages, msg) ) {
      this.messages[msg] = {};
    }
    // 不同实例订阅的msg可能有不同行为，故以token为标识
    var token = 'uid_' + String(++this.lastUid);
    this.messages[msg][token] = func;
    // return token for unsubscribing
    return token;
  }
/* 
 * @param {String | Function } value A token, function or topic
 */
  unsubscribe(value) {
    var isTopic = typeof value === 'string' && Object.prototype.hasOwnProperty.call(this.messages, value),
        isToken = !isTopic && typeof value === 'string',
        isFunction = typeof value === 'function',
        result = false,
        m, message, t
    if(isTopic) {
      this.#clearSubscriptions(value);
      return;
    }
    for (m in this.messages) {
      if(Object.prototype.hasOwnProperty.call(this.messages, m) ) {
        message = this.messages[m];

        if( isToken && message[value]){
          delete message[value];
          result = value;
          break;
        }

        if(isFunction) {
          for (t in message) {
            if(Object.prototype.hasOwnProperty.call(message, t) && message[t] === value) {
              delete message[t];
              result = true;
            }
          }
        }
      }
    }
  }
  subscribeOnce(msg, func) {
    var _this = this
    var token = this.subscribe(msg, function() {
      _this.unsubscribe(token);
      //func.bind(null, ...arguments)()
      func.apply(null, arguments)
    })
    return this
  }
}