(function(root) {
  readingList = root.readingList || {}
  
  const events = new Map()
  readingList.eventEmitter = {
    on: function(event, listener) {
      if (typeof listener !== 'function') {
	throw new TypeError('Listener must be function')
      }
      let listeners = events.get(event)
      if (listeners === undefined) {
	listeners = new Set()
	events.set(event, listeners)
      }
      listeners.add(listener)
    },
    off: function(event, listener) {
      switch (arguments.length) {
	case 0:
	  events.clear()
	case 1:
	  events.delete(event)
	default:
	  const listeners = events.get(event)
	  if (listeners) {
	    listeners.delete(listener)
	  }
      }
    },
    emit(event, ...args) {
      const listeners = events.get(event)
      if (listeners) {
	for (let listener of listeners) {
	  listener.apply(null, args)
	}
      }
    }
  }
})(this)
