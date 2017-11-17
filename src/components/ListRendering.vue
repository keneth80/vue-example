<<template>
  <div class='container'>
      <h1>Let's hear some stories!</h1>
      <ul class='list-group'>
          <li v-for='(value, key, index) in storyObj'
               class='list-group-item'
               >
              {{index}} : {{key}} : {{value}}
          </li>
      </ul>
      <div>
        <ul class="list-group">
            <li v-for="story in stories" class="list-group-item">
                Someone said "{{ story }}"
            </li>
        </ul>
      </div>
  </div>
</template>

<<script>
export default {
  name: 'ListRendering',
  data () {
    return {
      storyObj: {
        plot: 'Someone ate my chocolate...',
        writer: 'John',
        upvotes: 38
      },
      stories: [
        'I crashed my car today!',
        'Yesterday, someone stole my bag!',
        'Someone ate my chocolate...'
      ]
    }
  }
}
</script>

