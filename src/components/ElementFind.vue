<template>
    <div class="container">
        <h1>Element Find</h1>
        <ul class="list-group" ref="listgroup">
            <story v-for="(story, index) in stories" ref="stories"
                :key="index"
                :story="story"
                :favorite="favorite"
                @update="updateFavorite">
            </story>
        </ul>
    </div>
</template>
<script>
// ref directives use : ref="listgroup" and ref="stories"
// result : vm.$refs
import Vue from 'vue';

Vue.component('story', {
    template: `
        <li class="list-group-item">
            {{ story.writer }} said "{{ story.plot }}".
            Story upvotes {{ story.upvotes }}.
            <button v-show="!story.voted" @click="upvote" class="btn btn-default">
                Upvote
            </button>
            <button v-show="!isFavorite" @click="markAsFavorite" class="btn btn-primary">
                Favorite
            </button>
            <span v-show="isFavorite" class="glyphicon glyphicon-star pull-right" aria-hidden="true">
            </span>
        </li>`,
    props: ['story', 'favorite'],
    methods: {
        upvote: function () {
            this.story.upvotes += 1;
            this.story.voted = true;
        },
        markAsFavorite: function () {
            // 'update' is just the name of the custom event
            // it could be anything. ex: fav-update
            dispatchEvent(new CustomEvent('StoryChange', {detail: this.story}));
            this.$emit('update', this.story);
        }
    },
    computed: {
        isFavorite: function () {
            console.log('isFavorite : ', this.story);
            return this.story === this.favorite;
        }
    }
});
export default {
    name: 'ElementFind',
    data () {
        return {
            stories: [
                {
                    plot: 'My horse is amazing.',
                    writer: 'Mr. Weebl',
                    upvotes: 28,
                    voted: false
                },
                {
                    plot: 'Narwhals invented Shish Kebab.',
                    writer: 'Mr. Weebl',
                    upvotes: 8,
                    voted: false
                },
                {
                    plot: 'The dark side of the Force is stronger.',
                    writer: 'Darth Vader',
                    upvotes: 49,
                    voted: false
                },
                {
                    plot: 'One does not simply walk into Mordor',
                    writer: 'Boromir',
                    upvotes: 74,
                    voted: false
                }
            ],
            favorite: {}
        };
    },
    methods: {
        updateFavorite: function (story) {
            this.favorite = story;
        }
    },
    created () {
        var that = this;
        addEventListener('StoryChange', function (e) {
            console.log('StoryChange : ', e, that);
        });
        console.log('created story parent component : ', this.$refs);
    }
};
</script>
