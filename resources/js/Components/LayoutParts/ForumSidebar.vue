<script setup lang="ts">
import { defineProps } from 'vue';
//import { route } from 'momentum-trail'; // If you're using the 'route' function from 'momentum-trail'

const { topic, section_one, section_two, section_three } = defineProps([
    'topic',
    'section_one',
    'section_two',
    'section_three',
]);

function getCurrentpath(id) {
    if (route('forum.page', { id }) === window.location.href) {
        return window.location.pathname;
    }
}
</script>

<template>
    <div class="mb-2 text-xl fw-semibold">Forum</div>
    <Link v-if="$page.props.auth.user.staff >= '1'" class="mb-2 btn btn-danger btn-xs btn-block forum-button"
        :href="route('forum.create.page', { id: topic.id })">
    New Post
    </Link>
    <Link v-else-if="$page.props.auth.user.staff != '1' && topic.is_staff_only_posting == '0'"
        class="mb-2 btn btn-success btn-xs btn-block forum-button" :href="route('forum.create.page', { id: topic.id })">
    New Post
    </Link>
    <ul class="tabs flex-dir-column">

        <li v-for="Official in section_one" :key="Official.id" class="tab-item">
            <Link :href="route('forum.page', { id: Official.id })" class="tab-link squish"
                :class="{ 'active': getCurrentpath({ id: Official.id }) }">
            <i v-if="Official.is_staff_only_posting == '1'" class="fas fa-lock"></i>&nbsp;{{ Official.name }}
            <div class="text-xs">{{ Official.description }}</div>
            </Link>
        </li>
        <li v-for="Community in section_two" class="tab-item">
            <Link :href="route('forum.page', { id: Community.id })" class="tab-link squish"
                :class="{ 'active': getCurrentpath({ id: Community.id }) }">
            {{ Community.name }}
            <div class="text-xs">{{ Community.description }}</div>
            </Link>
        </li>
        <li v-for="Serious in section_three" class="tab-item">
            <Link :href="route('forum.page', { id: Serious.id })" class="tab-link squish"
                :class="{ 'active': getCurrentpath({ id: Serious.id }) }">
            {{ Serious.name }}
            <div class="text-xs">{{ Serious.description }}</div>
            </Link>
        </li>
    </ul>
</template>
