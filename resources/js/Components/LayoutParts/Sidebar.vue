<script setup lang="ts">
import { ref, onMounted, reactive, watch, watchEffect, computed } from 'vue';
import { Head, router, Link, usePage } from '@inertiajs/vue3';
import axios from 'axios';
//import { route, current } from "momentum-trail";
defineProps({
    chat_toggle: { type: Boolean, default: false },
});

const sidebar = [
    {
        url: "#",
        en: { title: "Games" },
        th: { title: "เกม" },
        jp: { title: "ゲーム" }
    },
    {
        url: route(`store.page`),
        en: { title: "Market" },
        th: { title: "ตลาด" },
        jp: { title: "市場" },
    },
    {
        url: route(`forum.page`, { id: 1 }),
        en: { title: "Discuss" },
        th: { title: "สนทนา" },
        jp: { title: "議論" },
    },
    {
        url: "#",
        en: { title: "Develop" },
        th: { title: "พัฒนา" },
        jp: { title: "発展" }
    },
    {
        url: "#",
        en: { title: "Players" },
        th: { title: "ผู้เล่น" },
        jp: { title: "発展" }
    },
    {
        url: "#",
        en: { title: "Spaces" },
        th: { title: "ช่องว่าง" },
        jp: { title: "スペース" }
    },
    {
        url: "#",
        en: { title: "Leaderboard" },
        th: { title: "กระดานผู้นำ" },
        jp: { title: "リーダーボード" }
    },
    {
        url: "#",
        en: { title: "Upgrade" },
        th: { title: "อัปเกรด" },
        jp: { title: "アップグレード" }
    },

];
const lang = computed(() => usePage().props.locale);

usePage<any>()
const { props } = usePage<any>();
</script>
<template>
    <nav class="sidebar show-for-large" id="sidebar">
        <ul class="sidebar-nav">
            <div class="hide-for-large" v-if="!$page.props.auth.user">
                <li class="side-item side-title">Account</li>
                <li  class="side-item">
                    <Link :href="route('auth.register.page')" class="side-link"><i
                        class="fas fa-user-plus side-icon"></i><span>Get Started</span></Link>
                </li>
                <li  class="side-item">
                    <Link :href="route('auth.login.page')" class="side-link"><i
                        class="fas fa-sign-in side-icon"></i><span>Log In</span></Link>
                </li>
            </div>
            <li class="side-item side-title">Navigation</li>
            <li class="side-item">
                <Link :href="route('Welcome')"
                    :class="{ 'active': $page.url === route('Welcome').path || $page.url === route('my.dashboard.page').path }"
                    class="side-link"><i class="fas fa-home side-icon"></i><span>Home</span></Link>
            </li>
            <div class="hide-for-large">
                <li class="side-item">
                    <Link href="#" class="side-link"><i class="fas fa-gamepad-alt side-icon"></i><span>Games</span></Link>
                </li>
                <li class="side-item">
                    <Link href="#" class="side-link"><i class="fas fa-shopping-basket side-icon"></i><span>Market</span>
                    </Link>
                </li>
                <li class="side-item" :class="{ 'active': $page.url.startsWith('/forum') }">
                    <Link href="#" class="side-link"><i class="fas fa-comments-alt side-icon"></i><span>Discuss</span>
                    </Link>
                </li>
                <li class="side-item">
                    <Link href="#" class="side-link"><i class="fas fa-tools side-icon"></i><span>Develop</span></Link>
                </li>
            </div>
            <li class="side-item side-title">Social</li>
            <li class="side-item">
                <Link :href="route('user.page')" :class="{ 'active': $page.url.startsWith('/users') }" class="side-link"><i
                    class="fas fa-users side-icon"></i><span>Players</span></Link>
            </li>
            <li class="side-item">
                <Link href="#" class="side-link"><i class="fas fa-planet-ringed side-icon"></i><span>Spaces</span></Link>
            </li>
            <li class="side-item">
                <Link href="#" class="side-link"><i class="fas fa-list-ol side-icon"></i><span>Leaderboard</span></Link>
            </li>

            <li v-if="$page.props.auth.user" class="side-item side-title">My Spaces</li>
            <li v-if="$page.props.auth.user" class="side-item">
                <Link href="#" class="side-link side-link-has-img">
                <span class="side-img">
                    <img src="/assets/img/icon.png" />
                </span>
                <span>Project Eclipse</span>
                </Link>
            </li>
            <div v-if="$page.props.auth.user" class="side-item side-title">Boost Your Account</div>
            <li class="side-item">
                <Link href="#" class="side-link side-upgrade is-disabled"><i
                    class="fas fa-rocket-launch side-icon"></i><span>Upgrade</span></Link>
            </li>
            <!--
                        <li class="side-item action-menu">
                            <Link href="#" class="side-link">
                                <img src="/props/aeo_headshot.png" alt="Image" class="rounded avaimg"><span>&nbsp;Aeo</span>
                                  </a
                            >
                        </li>
                    -->
        </ul>
    </nav>
    <main class="container-site">
        <main class="container">
            
	    <div class="py-2 mb-4 text-center alert alert-info fw-semibold">
                <div class="gap-2 align-middle flex-container align-justify">
                    <i class="text-lg far fa-exclamation-circle pe-2"></i>
                    <div>{{ usePage().props.site_config.announcement_message }}</div>
                    <i class="text-lg far fa-exclamation-circle pe-2"></i>
                </div>
            </div>
            <div v-if="usePage().props.site_config.site_maintenance" class="alert alert-warning text-center text-white">
                You are currently in maintenance mode. <Link :href="route('maintenance.exit')" class="text-white fw-semibold">[Exit]</Link>
            </div>
            <div class="grid-x grid-margin-x align-center">
                <slot />
                <div id="chat-container" class="chat-container chat-vis focused" @click='chat_toggle = !chat_toggle'
                    v-show='chat_toggle' style="right: 66px; z-index: 1060;">
                    <div class="chat-main">
                        <div class="chat-windows-header chat-header bg-info hover">
                            <div class="chat-header-label">
                                <span class="chat-caption-header text-overflow chat-header-title">
                                    Aeo
                                </span>
                            </div>
                            <!--
                            <div class="chat-header-action">
                                <i class="chat-icon fas fa-message-xmark chat-link-icon"></i>
                                <i class="chat-icon fas fa-cog chat-link-icon"></i>
                                <i class="chat-icon fas fa-gamepad-modern chat-link-icon"></i>
                            </div>
                        -->
                        </div>
                        <div class="chat-body card-chat card-chat-body no-corners">

                        </div>
                    </div>
                </div>
            </div>
        </main><!-- End #main -->
    </main><!-- End #main -->
</template>

<script lang="ts">
export default {
    methods: {
        showModal(modalId: string): void {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.toggle("active");
            }
        },
        addActiveClass(elementId: string): void {
            const element = document.getElementById(elementId);
            if (element) {
                element.classList.toggle('active');
            }
        },
        sidebarOpen(): void {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('show-for-large');
            }
        },
        addActiveClassSSInput(elementId: string): void {
            const element = document.getElementById(elementId) as HTMLInputElement;
            const isEmpty = (str: string): boolean => !str.trim().length;

            if (element) {
                element.addEventListener('input', function () {
                    if (isEmpty(this.value)) {
                        return;
                    } else {
                        element.classList.toggle('hide');
                    }
                });
            }
        }
    }
};
</script>
