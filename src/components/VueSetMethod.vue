<template>
    <div class="container">
        <h1>Vue.set (vm.$set) Array watch</h1>
        <div>
            <span>ID: </span>
            <input type="text" v-model="memberId">
            <button @click="updateId">ID Update</button>
            <button @click="addMember">List Add</button>
            <span>index: </span>
            <input type="text" v-model.number.lazy="itemIndex">
            <button @click="modifyMember">List Item Modify</button>
            <button @click="setMember">List Item Modify $set</button>
            <ul class="list-group" >
                <li class="list-group-item" v-for="(item, index) in members" :key="index"> {{ item }} </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VueSetMethod',
    data () {
        return {
            memberId: '',
            member: {
                memberId: 'I01',
                memberName: 'kenneth'
            },
            members: [],
            itemIndex: 0
        };
    },
    mounted () {
        this.memberId = this.member.memberId;
    },
    watch: {
        members: {
            handler: function (newvalue, oldvalue) {
                console.log('members watch : ', newvalue, oldvalue);
            }
        }
    },
    methods: {
        updateId () {
            this.$set(this.member, 'memberId', this.memberId);
        },
        addMember () {
            this.members.push(Object.assign(this.member));
        },
        modifyMember () {
            const member = {
                memberId: 'M001',
                memberName: 'modified'
            };
            this.members[this.itemIndex] = member;
        },
        setMember () {
            const member = {
                memberId: 'M001',
                memberName: '$set modified'
            };
            this.$set(this.members, this.itemIndex, member);
        }
    }
};
</script>
