function ElementBuilder(name) {
  this.element = document.createElement(name)

  this.id = function (id) {
    this.element.id = id
    return this
  }

  this.forId = function (id) {
    this.element.for = id
    return this
  }

  this.value = function (value) {
    this.element.value = value
    return this
  }

  this.type = function (type) {
    this.element.type = type
    return this
  }

  this.text = function (text) {
    this.element.textContent = text
    return this
  }

  this.html = function (htmlValue) {
    this.element.innerHTML = htmlValue
    return this
  }

  this.getText = function () {
    return this.element.textContent
  }

  this.src = function (src) {
    this.element.src = src
    return this
  }

  this.className = function (name) {
    this.element.className = name
    return this
  }

  this.onSubmit = function (fn) {
    this.element.onsubmit = fn
    return this
  }

  this.onClick = function (fn) {
    this.element.onclick = fn
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
}

const builder = {
  create: function (name) {
    return new ElementBuilder(name)
  }
}

function Comments() {
  this.records = [
    {
      id: '1',
      text:
        'Great welcoming experience to the Dominican. We used Otium for the airport transport- we were to the resort in 20 minutes. Ralphy has been our concierge for the first half of the stay, he been very helpful- always able to pull through for anything we request',
      username: 'Jake W',
      imageurl:
        'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/9e/avatar069.jpg',
      date: 'January 2020',
      point: 11
    },
    {
      id: '2',
      text:
        'We travelled as a group of 13 ages 18 to 80 and this resort was enjoyed by all. Weve been fortunate to travel to many resorts in Punta Cana but the Grand was by far the best',
      username: 'Andrea C',
      imageurl:
        'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/55/avatar028.jpg',
      date: 'Jan 2020',
      point: 14
    },
    {
      id: '3',
      text:
        'The Hotel opened 1-1,5 hs ago. Everything is new and very clean. Even the cheapest rooms are very spacious (77square meters and room and dinning area with sofa bed are diivided by a sliding door).',
      username: 'sergiogiaco',
      imageurl:
        'https://media-cdn.tripadvisor.com/media/photo-l/01/2e/70/74/avatar056.jpg',
      date: 'Dec 2020',
      point: 11
    }
  ]

  const pointStatus = {}
  this.records.forEach((item) => {
    pointStatus[item.id] = 0
  })

  function error(type) {
    if (type === 'like') alert('you already like it')
    else if (type === 'dislike') alert('you already dislike it')
  }

  this.like = function (id) {
    if (pointStatus[id] < 1) {
      const index = this.records.findIndex((item) => item.id === id)
      this.records[index].point++
      pointStatus[id]++
      return true
    } else {
      error('like')
      return false
    }
  }
  this.dislike = function (id) {
    if (pointStatus[id] > -1) {
      const index = this.records.findIndex((item) => item.id === id)
      this.records[index].point--
      pointStatus[id]--
      return true
    } else {
      error('dislike')
      return false
    }
  }
  this.delete = function (id) {
    const index = this.records.findIndex((item) => item.id === id)
    this.records.splice(index, 1)
  }
  this.addPost = function (post) {
    this.records.push(post)
    pointStatus[post.id] = 0
  }
}

function Painter(root) {
  let mode = 'view'
  this.comments = new Comments()

  const cardPro = (username, imageurl) => {
    const pro = builder.create('div').className('pro')
    const image = builder.create('div').className('image').appendTo(pro)
    builder.create('img').src(imageurl).appendTo(image)
    builder.create('p').className('name').text(username).appendTo(pro)
    return pro
  }

  const cardPoints = (point, id) => {
    const points = builder.create('div').className('points')
    const p = builder.create('p').text('Total Points: ').appendTo(points)
    builder.create('span').className('count').text(point).appendTo(p)
    builder
      .create('span')
      .className('like')
      .text('👍')
      .onClick(() => {
        if (this.comments.like(id)) this.render()
      })
      .appendTo(p)
    builder
      .create('span')
      .className('dislike')
      .text('👎')
      .onClick(() => {
        if (this.comments.dislike(id)) this.render()
      })
      .appendTo(p)
    return points
  }

  const cardTop = (username, imageurl, point, id) => {
    const top = builder.create('div').className('top')
    builder
      .create('div')
      .className('delete')
      .text('x')
      .onClick(() => {
        this.comments.delete(id)
        this.render()
      })
      .appendTo(top)
    cardPro(username, imageurl).appendTo(top)
    cardPoints(point, id).appendTo(top)
    return top
  }

  const cardBottom = (text, date) => {
    const bottom = builder.create('div').className('bottom')
    builder.create('p').className('text').text(text).appendTo(bottom)
    builder.create('p').className('date').text(date).appendTo(bottom)
    return bottom
  }
  const card = ({ id, text, username, imageurl, date, point }) => {
    const comment = builder.create('div').className('card').id(id)
    cardTop(username, imageurl, point, id).appendTo(comment)
    cardBottom(text, date).appendTo(comment)
    return comment
  }

  const addCard = () => {
    const add = builder.create('div').className('card add')
    const image = builder
      .create('div')
      .className('addImage')
      .onClick(() => {
        mode = 'input'
        this.render()
      })
      .appendTo(add)
    builder.create('img').src('./images/add.png').appendTo(image)
    return add
  }

  const formSubmit = (e) => {
    e.preventDefault()

    const newPost = {
      username: e.target[0].value || 'Unknown',
      imageurl: e.target[1].value || './images/placeholder_male1.png',
      text:
        e.target[2].value ||
        'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      date: e.target[3].value || 'Feb 2021',
      point: 0,
      id: Math.random().toString()
    }

    this.comments.addPost(newPost)
    mode = 'view'
    this.render()
  }

  const wrapInput = (element, id) => {
    const wrap = builder
      .create('div')
      .className('wrap')
    builder
      .create('label')
      .forId(id).text(`${id}: `)
      .appendTo(wrap)
    builder
      .create(element)
      .id(id).type('text')
      .appendTo(wrap)
    return wrap
  }

  const inputCard = () => {
    const input = builder.create('div').className('card')
    const form = builder
      .create('form')
      .onSubmit((e) => {
        formSubmit(e)
      })
      .appendTo(input)
    wrapInput('input', 'username').appendTo(form)
    wrapInput('input', 'imageurl').appendTo(form)
    wrapInput('textarea', 'text').appendTo(form)
    wrapInput('input', 'date').appendTo(form)
    builder.create('input').type('submit').value('add').appendTo(form)
    return input
  }

  this.render = function () {
    root.innerHTML = ''
    const container = builder
      .create('div')
      .className('container')
      .html('')
      .appendTo(root)

    this.comments.records.forEach((item) => card(item).appendTo(container))

    if (mode === 'view') {
      addCard().appendTo(container)
    } else if (mode === 'input') {
      inputCard().appendTo(container)
    }
  }
}

const app = new Painter(document.getElementById('root'))
app.render()
