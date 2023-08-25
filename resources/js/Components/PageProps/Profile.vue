<script setup lang="ts">
defineProps({
    user: { type: Object, required: true },
});

</script>
<template>
   <div class="modal" id="following-modal">
    <div class="modal-card modal-card-body">
      <div class="section-borderless">
        <div class="gap-2 align-middle flex-container align-justify">
          <div class="text-lg fw-semibold">
            {{ user.display_name }}'s Following
          </div>
          <button
            @click="showModal('following-modal')"
            class="btn-circle"
            data-toggle-modal="#following-modal"
            style="margin-right: -10px"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="section-borderless">
        <div class="section">
          <div
            v-for="followingUser in user.following"
            :key="followingUser.id"
            class="gap-2 align-middle flex-container align-justify"
          >
            <div class="gap-2 align-middle flex-container">
              <img
                src="/assets/img/dummy_headshot.png"
                class="headshot"
                width="50"
              />
              <div class="w-100">
                <div class="fw-semibold">{{ followingUser.name }}</div>
                <div class="text-sm fw-semibold text-muted">
                  @{{ followingUser.username }}
                </div>
              </div>
            </div>
            <a href="#" class="min-w-0 btn btn-info btn-sm text-truncate">
              View Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal" id="followers-modal" @click="showModal('followers-modal')">
    <div class="modal-card modal-card-body">
      <div class="section-borderless">
        <div class="gap-2 align-middle flex-container align-justify">
          <div class="text-lg fw-semibold">
            {{ user.display_name }}'s Followers
          </div>
          <button
            @click="showModal('followers-modal')"
            class="btn-circle"
            data-toggle-modal="#followers-modal"
            style="margin-right: -10px"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div class="section-borderless">
        <div class="section">
          <div
            v-for="followerUser in user.followers"
            :key="followerUser.id"
            class="gap-2 align-middle flex-container align-justify"
          >
            <div class="gap-2 align-middle flex-container">
              <img
                src="/assets/img/dummy_headshot.png"
                class="headshot"
                width="50"
              />
              <div class="w-100">
                <div class="fw-semibold">{{ followerUser.name }}</div>
                <div class="text-sm fw-semibold text-muted">
                  @{{ followerUser.username }}
                </div>
              </div>
            </div>
            <a href="#" class="min-w-0 btn btn-info btn-sm text-truncate">
              View Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="cell medium-3">
        <div class="mb-3 card card-body">
            {{ user.status }}
        </div>
        <div class="mb-2 align-middle flex-container align-justify">
            <div class="gap-3 align-middle flex-container">
                <div class="text-xl" style="line-height: 16px">
                    <div class="mb-1 fw-semibold">{{ user.display_name }}</div>
                    <div class="text-sm text-muted fw-semibold">
                        {{ '@' + user.username }}
                    </div>
                </div>
            </div>
            <div class="dropdown position-relative" style="margin-right: -14px">
                <button class="text-sm far fa-ellipsis-vertical btn-circle" data-tooltip-title="More"
                    data-tooltip-placement="bottom"></button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li class="dropdown-item">
                        <a href="#" class="dropdown-link dropdown-link-has-icon">
                            <i class="fas fa-exchange dropdown-icon"></i>
                            Send Trade
                        </a>
                    </li>
                    <li class="dropdown-item">
                        <a href="#" class="dropdown-link dropdown-link-has-icon">
                            <i class="fas fa-flag dropdown-icon"></i>
                            Report
                        </a>
                    </li>
                    <div class="align-middle flex-container">
                        <div class="dropdown-title">Moderation</div>
                        <li class="divider flex-child-grow"></li>
                    </div>
                    <li class="dropdown-item">
                        <a href="#" class="dropdown-link dropdown-link-has-icon text-danger">
                            <i class="fas fa-gavel text-danger dropdown-icon"></i>
                            View in Panel
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div :class="['mb-3', 'card', 'card-body', 'card-status', userStatusClass]">
            <img src="/assets/img/dummy.png" />
            <div class="mt-3 text-center">
                <div class="gap-3 text-sm flex-container align-center">
                    <button class="min-w-0 px-0 text-center fw-semibold text-muted text-truncate"
                        @click="showModal('following-modal')">
                        <span class="text-body">{{ user.followers_count }}</span>
                        Following
                    </button>
                    <button class="min-w-0 px-0 text-center fw-semibold text-muted text-truncate"
                        @click="showModal('followers-modal')">
                        <span class="text-body">{{ user.following_count }}</span>
                        Followers
                    </button>
                </div>
                <div class="text-sm text-info fw-semibold">
                    Follows you
                </div>
            </div>
            <div class="min-w-0 gap-2 mt-3 flex-container">
                <button class="btn btn-info btn-sm text-truncate w-100" @click="toggleFollow(user.id)"
                    :class="{ 'btn-info': followed, 'btn-danger': !followed }">
                    {{ followed ? 'Unfollow' : 'Follow' }}
                </button>
                <!--
<button class="btn btn-danger btn-sm text-truncate w-100">
Unfollow
</button>
-->
                <button class="btn btn-success btn-sm text-truncate w-100">
                    Chat
                </button>
            </div>
            <a class="gap-2 p-2 mt-3 align-middle card card-inner flex-container">
                <img src="/assets/img/space_placeholder.png" class="headshot" width="40" />
                <div class="min-w-0" style="line-height: 14px">
                    <div class="text-xs text-truncate fw-bold text-muted text-uppercase">
                        Primary Space
                    </div>
                    <div class="text-sm text-truncate fw-semibold text-body">
                        Namesnipe
                    </div>
                </div>
            </a>
        </div>
        <div class="mb-1 text-xl fw-semibold">About Me</div>
        <div class="mb-3 card card-body">
            {{ user.about_me }}
        </div>
        <div class="mb-1 text-xl fw-semibold">Statistics</div>
        <div class="mb-3 card card-body">
            <div class="gap-1 align-middle flex-container flex-dir-column">
                <div class="text-sm text-membership fw-semibold w-100">
                    <i class="text-center fas fa-rocket-launch text-membership" style="width: 26px"></i>
                    Premium Subscriber
                </div>
                <div class="text-sm w-100">
                    <i class="text-center fas fa-medal text-muted" style="width: 26px"></i>
                    Rank Lvl. 2
                </div>
                <div class="text-sm w-100">
                    <i class="text-center fas fa-users-medical text-muted" style="width: 26px"></i>
                    Joined on {{ user.joindate }}
                </div>
                <div class="text-sm w-100">
                    <i class="text-center fas fa-clock text-muted" style="width: 26px"></i>
                    Last seen {{ user.DateHum }}
                </div>
                <div class="text-sm w-100">
                    <i class="text-center fas fa-messages text-muted" style="width: 26px"></i>
                    124 Discussion Posts
                </div>
            </div>
        </div>
        <div class="mb-1 text-xl fw-semibold">Spaces</div>
        <div class="mb-3 card card-body">
            <div class="gap-3 text-center flex-container flex-dir-column">
                <i class="text-5xl fas fa-planet-ringed text-muted"></i>
                <div style="line-height: 16px">
                    <div class="text-xs fw-bold text-muted text-uppercase">
                        No Spaces
                    </div>
                    <div class="text-xs text-muted fw-semibold">
                        {{ user.username }} has not joined any spaces.
                    </div>
                </div>
            </div>
            <!--
<div class="grid-x grid-margin-x grid-padding-y">
<div class="text-center cell medium-6 small-6">
<a href="#" class="text-body">
  <div class="mb-1 text-xs text-muted fw-bold text-uppercase">
    PRIMARY SPACE
  </div>
  <img src="/assets/img/space_placeholder.png" class="mb-1" />
  <div>
    <div class="text-sm fw-semibold text-truncate">
      Namesnipe
    </div>
    <div class="text-xs text-muted fw-semibold">
      12K Members
    </div>
  </div>
</a>
</div>
<div class="text-center cell medium-6 small-6">
<a href="#" class="text-body">
  <div
    class="mb-1 text-xs pointer-events-none text-muted fw-bold text-uppercase"
  >
    &nbsp;
  </div>
  <img src="/assets/img/icon.png" class="mb-1" />
  <div>
    <div class="text-sm fw-semibold text-truncate">
      Project Eclipse
    </div>
    <div class="text-xs text-muted fw-semibold">4 Members</div>
  </div>
</a>
</div>
</div>
-->
        </div>
    </div>
    <div class="cell medium-8">
        <div  class="mb-3 text-center alert alert-success fw-semibold">
            You are now following this user!
        </div>
        <div  style="height: 6px"></div>
        <div class="mb-1 align-middle flex-container align-justify">
            <div class="mb-1 text-xl fw-semibold">Achievements</div>
            <a href="#" class="btn btn-secondary btn-sm">View All</a>
        </div>
        <div class="mb-3 card card-body">
            <div class="gap-3 text-center flex-container flex-dir-column">
                <i class="text-5xl fas fa-award text-muted"></i>
                <div style="line-height: 16px">
                    <div class="text-xs fw-bold text-muted text-uppercase">
                        No Achievements
                    </div>
                    <div class="text-xs text-muted fw-semibold">
                        {{ user.username }} has not made any achievements.
                    </div>
                </div>
            </div>
            <!--
<div class="flex-wrap gap-3 flex-container align-center">
<div class="min-w-0 text-center" style="width: 80px">
<img src="/assets/img/achievement_dummy.png" />
<div class="text-xs fw-semibold text-truncate">
  Adminstrator
</div>
</div>
</div>
-->
        </div>
        <div class="mb-3 card card-body">
            <div class="section">
                <ul class="tabs">
                    <li class="tab-item">
                        <a href="#" class="tab-link active squish">Posts</a>
                    </li>
                    <li class="tab-item">
                        <a href="#" class="tab-link squish">Inventory</a>
                    </li>
                </ul>
            </div>
            <div class="section">
                <div class="gap-3 text-center flex-container flex-dir-column">
                    <i class="text-5xl fas fa-face-sleeping text-muted"></i>
                    <div style="line-height: 16px">
                        <div class="text-xs fw-bold text-muted text-uppercase">
                            No Posts
                        </div>
                        <div class="text-xs text-muted fw-semibold">
                            {{ user.username }} has not posted anything to their
                            feed.
                        </div>
                    </div>
                </div>
            </div>
            <!--
<div class="gap-3 section flex-container flex-dir-column-sm">
<div class="mx-auto flex-child-grow" style="width: 100px">
<a href="#" class="text-sm text-center d-block squish">
  <img
    src="/assets/img/dummy_headshot.png"
    class="mb-1 headshot"
    width="60"
  />
  <div style="line-height: 16px">
    <div class="text-membership text-truncate">{{ user.display_name }}</div>
    <div class="text-xs text-muted text-truncate">{{ '@' + user.username }}</div>
  </div>
</a>
</div>
<div class="card card-body card-inner w-100">
<div class="align-middle flex-container align-justify">
  <div class="w-100">
    <div class="text-xs text-muted">
      <i
        class="far fa-clock me-1"
        style="
          vertical-align: middle;
          margin-top: -2.5px;
          font-size: 10px;
        "
      ></i
      >Posted 23 minutes ago
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
    <div class="text-sm" style="margin-left: -6px">
      <button class="btn-like active squish">
        <i class="far fa-heart"></i>1
      </button>
    </div>
  </div>
  <div class="dropdown ms-auto position-relative">
    <button class="btn-circle" style="margin-right: -10px">
      <i class="fas fa-ellipsis-vertical"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li class="dropdown-item">
        <a
          href="#"
          class="dropdown-link dropdown-link-has-icon"
        >
          <i class="fas fa-flag dropdown-icon"></i> Report
        </a>
      </li>
      <div class="align-middle flex-container">
        <div class="dropdown-title">Moderation</div>
        <li class="divider flex-child-grow"></li>
      </div>
      <li class="dropdown-item">
        <a
          href="#"
          class="dropdown-link dropdown-link-has-icon text-danger"
        >
          <i class="fas fa-trash text-danger dropdown-icon"></i>
          Delete
        </a>
      </li>
    </ul>
  </div>
</div>
<div class="my-2 align-middle flex-container">
  <div class="text-xs fw-bold text-muted text-uppercase">
    Comments
  </div>
  <div class="divider flex-child-grow"></div>
</div>
<div class="gap-2 mb-2 flex-container">
  <input
    type="text"
    class="form form-sm form-has-section-color"
    placeholder="What are your thoughts on this post?"
  />
  <input
    type="button"
    class="btn btn-success btn-sm"
    value="Post"
  />
</div>
</div>
</div>
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
-->
        </div>
    </div>
</template>
