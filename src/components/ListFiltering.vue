<template>
  <div class="container">
    <h1>Let's hear some stories!</h1>
    <div>
      <h3>Alex's stories</h3>
      <ul class="list-group">
        <li v-for="(story, index) in storiesBy('Alex')" :key="index" class="list-group-item">
            {{ story.writer }} said "{{ story.plot }}"
        </li>
      </ul>
        <h3>John's stories</h3>
        <ul class="list-group">
          <li v-for="(story, index) in storiesBy('John')" :key="index" class="list-group-item">
              {{ story.writer }} said "{{ story.plot }}"
          </li>
        </ul>
    </div>
    <pre>
      {{ $data }}
    </pre>
  </div>
</template>

<script>
export default {
  name: 'ListFiltering',
  data () {
    return {
      stories: [
        {
          plot: 'I crashed my car today!',
          writer: 'Alex'
        },
        {
          plot: 'Yesterday, someone stole my bag!',
          writer: 'John'
        },
        {
          plot: 'Someone ate my chocolate...',
          writer: 'John'
        },
        {
          plot: 'I ate someone s chocolate!',
          writer: 'Alex'
        }
      ]
    }
  },
  methods: {
    // a method which filters the stories depending on the writter
    storiesBy: function (writer) {
      return this.stories.filter(function (story) {
        return story.writer === writer
      })
    }
  }
}
</script>
