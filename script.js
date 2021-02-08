function ElementBuilder(name) {
  this.element = document.createElement(name)

  this.text = function (text) {
    this.element.textContent = text
    return this
  }

  this.id = function (id) {
    this.element.type = id
    return this
  }

  this.src = function (src) {
    this.element.src = src
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

const comments = [
  {
    id: '1',
    text:
      'Great welcoming experience to the Dominican. We used Otium for the airport transport- we were to the resort in 20 minutes. Ralphy has been our concierge for the first half of the stay, he been very helpful- always able to pull through for anything we request',
    username: 'Jake W',
    imageurl:
      'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/9e/avatar069.jpg',
    date: 'January 2020',
    point: 11,
  },
  {
    id: '2',
    text:
      'We travelled as a group of 13 ages 18 to 80 and this resort was enjoyed by all. Weve been fortunate to travel to many resorts in Punta Cana but the Grand was by far the best',
    username: 'Andrea C',
    imageurl:
      'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/55/avatar028.jpg',
    date: 'Jan 2020',
    point: 14,
  },
  {
    id: '3',
    text:
      'The Hotel opened 1-1,5 hs ago. Everything is new and very clean. Even the cheapest rooms are very spacious (77square meters and room and dinning area with sofa bed are diivided by a sliding door).',
    username: 'sergiogiaco',
    imageurl:
      'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/74/avatar056.jpg',
    date: 'Dec 2020',
    point: 11,
  },
]

function card({ id, text, username, imageurl, date, point }) {
  const comment = builder.create('div').className('comment').id(id)
  const top = builder.create('div').className('top').appendTo(comment)
  const pro = builder.create('div').className('pro').appendTo(top)
  const image = builder.create('div').className('image').appendTo(pro)
  builder.create('img').src(imageurl).appendTo(image)
  builder.create('p').className('name').text(username).appendTo(pro)
  const points = builder.create('div').className('points').appendTo(top)
  const p = builder.create('p').text('Total Points: ').appendTo(points)
  builder.create('span').className('count').text(point).appendTo(p)
  builder.create('span').className('like').text('👍').appendTo(p)
  builder.create('span').className('dislike').text('👎').appendTo(p)
  const bottom = builder.create('div').className('bottom').appendTo(comment)
  builder.create('p').className('text').text(text).appendTo(bottom)
  builder.create('p').className('date').text(date).appendTo(bottom)
  return comment
}

const commentList = comments.map((item) => card(item))
const container = builder
  .create('div')
  .className('container')
  .appendTo(document.getElementById('root'))
commentList.forEach((item) => item.appendTo(container))
