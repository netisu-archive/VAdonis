<template>
    <div v-if="$page.props.flash && $page.props.flash.success && show"
        class="mb-3 text-center alert alert-success fw-semibold" @click="show = false">
        {{ $page.props.flash.success }}
    </div>
    <div v-if="$page.props.flash && ($page.props.flash.error || Object.keys($page.props.errors).length > 0) && show"
        class="mb-3 text-center alert alert-danger fw-semibold">
        <div v-if="$page.props.flash && $page.props.flash.error">{{ $page.props.flash.error }}</div>
        <div v-else>
            <span v-if="Object.keys($page.props.errors).length === 1">You have an error in your request.</span>
            <div>You have {{ Object.keys($page.props.errors).length }} errors in your request.</div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    data() {
        return {
            show: true,
        }
    },
    watch: {
        '$page.props.flash': {
            handler() {
                this.show = true
            },
            deep: true,
        }
    }
}
</script>
