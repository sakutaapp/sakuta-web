<template>
    <Container>
        <div v-for="category in categories" :key="category.key" class="mb-15">
            <h2 class="text-xl font-bold uppercase mb-3">{{ $t(`explore.heading.${category.key}`) }}</h2>
            <MediaGrid :media="category.media" />
        </div>
    </Container>
</template>

<script>
import explore from "../apollo/queries/explore";
export default {
    apollo: {
        Data: {
            query: explore,
            update: (data) => {
                return {
                    ...data
                }
            }
        }
    },
    computed: {
        categories() {
            let array = [];
            if(!this.Data) return array;
            Object.keys(this.Data).forEach((key) => {
                array.push({
                    ...this.Data[key],
                    key
                });
            });
            return array;
        }
    }
};
</script>
