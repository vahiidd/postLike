function ElementBuilder(name) {
  this.element = document.createElement(name)

  this.text = function (text) {
    this.element.textContent = text
    return this
  }

  this.type = function (type) {
    this.element.type = type
    return this
  }

  this.className = function (name) {
    this.element.className = name
    return this
  }

  this.onClick = function (fn) {
    this.element.onclick = fn
    return this
  }

  this.html = function (htmlvalue) {
    this.element.innerHTML = htmlvalue
    return this
  }

  this.value = function (value) {
    this.element.value = value
    return this
  }

  this.appendTo = function (parent) {
    if (parent instanceof ElementBuilder) {
      parent.element.appendChild(this.element)
    } else {
      parent.appendChild(this.element)
    }
    return this
  }

  this.placeHolder = function (text) {
    this.element.placeholder = text
    return this
  }
}

const builder = {
  create: function (name) {
    return new ElementBuilder(name)
  },
}
