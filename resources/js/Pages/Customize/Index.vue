<script setup lang="ts">
import Navbar from '@/Components/LayoutParts/Navbar.vue';
import Sidebar from '@/Components/LayoutParts/Sidebar.vue';
import Footer from '@/Components/LayoutParts/Footer.vue';
function showModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.toggle("active");
    }
};
</script>
    <template>
	<Navbar/>
        <Sidebar>
            <div class="modal" id="PartsModal">
                soon.
            </div>
            <div class="cell medium-3">
                <div class="mb-1 align-middle flex-container align-justify">
                    <div class="mb-1 text-xl fw-semibold">Avatar</div>
                    <div class="button position-relative" style="margin-right: -14px" @click="showModal('PartsModal')">
                        <button class="text-sm far fa-fill-drip btn-circle" data-tooltip-title="More"
                            data-tooltip-placement="bottom"></button>
                    </div>
                </div>
                <div class="mb-3 card card-body">
                    <img src="/assets/img/dummy.png" />
            
                    <div class="min-w-0 gap-2 mt-3 flex-container">
                        <button class="btn btn-danger btn-sm text-truncate w-100">
                            Reset
                        </button>
                        <button class="btn btn-info btn-sm text-truncate w-100">
                            Random
                        </button>
                    </div>
                </div>
                <div class="text-center">
                    <div class="card card-body">
                        <div style="margin-bottom:2.5px;">
                            <button class="avatar-body-part" id="Head" :style="{
                                backgroundColor: userAvatar.color_head,
                                padding: '25px',
                                borderRadius: '15px',
                                marginTop: '-1px'
                              }" data-part="head"></button>
                        </div>
                        <div style="margin-bottom:2.5px;">
                            <button class="avatar-body-part" id="Left-Arm" :style="{
                                backgroundColor: userAvatar.color_left_arm,
                                padding: '50px',
                                paddingRight: '0px'
                              }" data-part="left_arm"></button>
                            <button class="avatar-body-part" id="Torso" :style="{
                                backgroundColor: userAvatar.color_torso,
                                padding: '50px',
                              }" data-part="torso"></button>
                            <button class="avatar-body-part " id="Right-Arm" :style="{
                                backgroundColor: userAvatar.color_right_arm,
                                padding: '50px',
                                paddingRight: '0px'
                              }" data-part="right_arm"></button>
                        </div>
                        <div>
                            <button class="avatar-body-part" id="Left-Leg"
                            :style="{
                                backgroundColor: userAvatar.color_left_leg,
                                padding: '50px',
                                paddingRight: '0px',
                                paddingLeft: '47px'
                              }" data-part="left_leg"></button>
                            <button class="avatar-body-part" id="Right-Leg" :style="{
                                backgroundColor: userAvatar.color_right_leg,
                                padding: '50px',
                                paddingRight: '0px',
                                borderBottom: '15px',
                                paddingLeft: '47px'
                              }" data-part="right_leg"></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cell medium-8">
                <div class="mb-1 align-middle flex-container align-justify">
                    <div class="mb-1 text-xl fw-semibold">Inventory</div>
                </div>
                <div class="mb-3 card card-body">
                    <div class="gap-3 text-center flex-container flex-dir-column">
                        <i class="text-5xl fas fa-wand-magic-sparkles text-muted"></i>
                        <div style="line-height: 16px">
                            <div class="text-xs fw-bold text-muted text-uppercase">
                                No Items.
                            </div>
                            <div class="text-xs text-muted fw-semibold">
                                You are not wearing any items.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-3 card card-body">
                    <div class="section">
                        <ul class="tabs">
                            <li class="tab-item">
                                <a href="#" class="tab-link active squish">Hats</a>
                            </li>
                            <li class="tab-item">
                                <a href="#" class="tab-link squish">Shirts</a>
                            </li>
                            <li class="tab-item">
                                <a href="#" class="tab-link squish">Accessories</a>
                            </li>
                            <li class="tab-item">
                                <a href="#" class="tab-link squish">Pants</a>
                            </li>
                            <li class="tab-item">
                                <a href="#" class="tab-link squish">Heads</a>
                            </li>
                        </ul>
                    </div>
                    <div class="section">
                        <div class="gap-3 text-center flex-container flex-dir-column">
                            <i class="text-5xl fas fa-crate-apple text-muted"></i>
                            <div style="line-height: 16px">
                                <div class="text-xs fw-bold text-muted text-uppercase">
                                    No insert_category_name_here
                                </div>
                                <div class="text-xs text-muted fw-semibold">
                                    You have no items in the category.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
<Footer/>
<!--
    {{ AVATAR CLASSES }}
    Body Colors:
    {{ userAvatar.color_head }}
    {{ userAvatar.color_torso }}
    {{ userAvatar.color_left_arm }}
    {{ userAvatar.color_right_arm }}
    {{ userAvatar.color_left_leg }}
    {{ userAvatar.color_right_leg }}

    Items: [
        Hats [
    {{ userAvatar.items[0].hats.hat_1 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_2 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_3 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_4 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_5 ?? 'none' }}
    {{ userAvatar.items[0].hats.hat_6 ?? 'none' }}
],
    {{ userAvatar.items[0].face ?? 'none' }}
    {{ userAvatar.items[0].gear ?? 'none' }}
    {{ userAvatar.items[0].shirt ?? 'none' }}
    {{ userAvatar.items[0].pants ?? 'none' }}

    ];
!-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        avatar: {
            type: Object as () => Record<string, unknown>,
            required: true,
        },
    },
    data() {
        return {
            userAvatar: {
                color_head: (this.avatar as Record<string, unknown>).color_head as string,
                color_torso: (this.avatar as Record<string, unknown>).color_torso as string,
                color_left_arm: (this.avatar as Record<string, unknown>).color_left_arm as string,
                color_right_arm: (this.avatar as Record<string, unknown>).color_right_arm as string,
                color_left_leg: (this.avatar as Record<string, unknown>).color_left_leg as string,
                color_right_leg: (this.avatar as Record<string, unknown>).color_right_leg as string,
                items: [
                    {
                        hats: {
                            hat_1: (this.avatar as Record<string, unknown>).hat_1 as string,
                            hat_2: (this.avatar as Record<string, unknown>).hat_2 as string,
                            hat_3: (this.avatar as Record<string, unknown>).hat_3 as string,
                            hat_4: (this.avatar as Record<string, unknown>).hat_4 as string,
                            hat_5: (this.avatar as Record<string, unknown>).hat_5 as string,
                            hat_6: (this.avatar as Record<string, unknown>).hat_6 as string,
                        },
                        face: (this.avatar as Record<string, unknown>).face as string,
                        gear: (this.avatar as Record<string, unknown>).gear as string,
                        shirt: (this.avatar as Record<string, unknown>).shirt as string,
                        pants: (this.avatar as Record<string, unknown>).pants as string,

                    },
                ],
            },
        };
    },
});
</script>
