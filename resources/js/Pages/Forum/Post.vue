<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
import ForumSidebar from '@/Components/LayoutParts/ForumSidebar.vue'
//import { route, current } from "momentum-trail";
import { ref } from 'vue';

defineProps({
    topic: Object,
    post: Object,
    section_one: Object,
    section_two: Object,
    section_three: Object,
})
const isHidden = ref(true);
</script>

<style>
.headerDivider {
    border-left: 1px solid #38546d;
    border-right: 1px solid #16222c;
    height: 80px;
    position: absolute;
    right: 249px;
    top: 10px;
}
</style>
<template>
    <Navbar/>
	<Sidebar>
	<div class="cell medium-3">
          <ForumSidebar :topic="topic" :section_one="section_one" :section_two="section_two" :section_three="section_three"/>
       </div>
	 <div class="cell medium-9">
            <div class="mb-2">
                    <div class="mb-2 text-xl fw-semibold">{{ post.title }} </div><div class="mb-2 text-xs text-muted fw-semibold">A post by: {{ post.creator.username }}</div>
                </div>
            <div class="card-body">
                <div class="gap-2 align-middle flex-container">
                    <div class="gap-2 mb-3 align-middle flex-container flex-dir-column">
                        <a :href="route('user.profile', { username: post.creator.username })">
                            <img src="/assets/img/dummy.png"
                                style="max-width:136px"
                                class="border img-fluid" alt="2oddMacs1">
                        </a>
                        <div class="text-center" style="line-height: 16px">
                            <div class="fw-semibold">{{ post.creator.display_name }} <i class="ml-1 fas fa-shield-check text-success" style="font-size:13px;" title="This user is verified." data-toggle="tooltip"></i>
                            </div>
                            <div class="text-xs fw-semibold text-muted">
                                {{ '@' + post.creator.username }}
                            </div>
                        </div>
                    </div>
                    <div class="divider verticalDivider"></div>
                    <div class="card card-body w-100">
                        <div class="gap-1 flex-container flex-dir-column">
                        <div class="mb-2 text-sm text-muted fw-semibold"><i class="fas fa-clock"></i>&nbsp; Post by: {{ post.creator.username }}, <b>{{ post.DateHum }}</b></div>
                        <div class="mb-2" v-html="post.body" style="white-space: pre-wrap;"></div>
                        </div>
                    </div>
                </div>
                <div class="mx-1 my-3 divider"></div>
                <div class="section">
                    <ul class="pagination flex-container align-center">
                        <button class="page-link page-disabled">
                            <i class="fa-regular fa-chevron-left"></i>
                        </button>
                        <button class="page-link page-active">1</button>
                        <button class="page-link">2</button>
                        <button class="page-link">3</button>
                        <button class="page-link">
                            <i class="fa-regular fa-chevron-right"></i>
                        </button>
                    </ul>
                </div>
            </div>
            <div  v-if="!isHidden" class="section flex-container align-center">
                <textarea id="post-body" class="form" name="body" placeholder="Body" maxlength="4096"></textarea>
            </div>
            <div class="section flex-container align-center">
            <a v-on:click="isHidden = !isHidden"  class="btn btn-success"><i class="fas fa-plus"></i>&nbsp;Reply</a>
        </div>
    </div>
    </Sidebar>
   <Footer/>
</template>
