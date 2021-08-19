<template>
    <Container class="mt-5">
        <anilist-gql-response>{{ Media }}</anilist-gql-response>
        <MediaHeader :media="Media" mediaType="manga" />
        <div class="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
            <div class="w-full md:w-1/5 flex flex-col space-y-3">
                <MediaProperties :properties="properties" />
                <MediaGenres :genres="genres" />
                <MediaTags :tags="tags" />
                <MediaTrailer :trailer="trailer" />
            </div>
            <div class="w-full md:w-4/5 flex flex-col space-y-3">
                <MediaDescription :description="description" />
                <MediaCharacters :characters="characters" @open="modal($event)" />
            </div>
        </div>
        <CharacterModal v-if="modalData.show && modalData.character" :character="modalData.character" @close="modal()" />
    </Container>
</template>


<script>
import Vue from "vue";
import manga from "../../apollo/queries/manga";

export default Vue.extend({
    head() {
        return {
            title: this.Media?.title?.english || this.Media?.title?.romaji || this.Media?.title?.native || "Manga",
        }
    },
    apollo: {
        Media: {
            query: manga,
            prefetch: ({ route }) => ({ id: route.params.id }),
            variables () {
                return { id: this.$route.params.id }
            }
        }
    },
    data() {
        return {
            modalData: {
                show: false,
                character: false
            }
        }
    },
    computed: {
        hash() { return location.hash },
        description() { return this.Media?.description || "" },
        characters() { return this.Media?.characters?.edges || [] },
        episodes() { return this.Media?.streamingEpisodes || [] },
        trailer() { return this.Media?.trailer?.id || undefined },
        genres() { return this.Media?.genres || [] },
        tags() { return this.Media?.tags || [] },
        studiosString() {
            let studiosArray = [];
            if(this.Media?.studios?.edges) {
                this.Media?.studios?.edges?.forEach(studio => {
                    studiosArray.push(studio.node.name);
                });
            }
            return studiosArray.join(", ");
        },
        properties() {
            return [
                {
                    prop: "chapters",
                    value: this.Media?.chapters,
                },
                {
                    prop: "source",
                    value: this.$i18n.t(`media.source.${this.Media?.source}`)
                },
                {
                    prop: "mean",
                    value: this.$i18n.t(`media.mean`, [this.Media?.meanScore])
                },
                {
                    prop: "hashtag",
                    value: this.Media?.hashtag
                },
                {
                    prop: "synonyms",
                    value: this.Media?.synonyms.join(", ")
                },
                {
                    prop: "studios",
                    value: this.studiosString
                }
            ];
        }
    },
    methods: {
        modal(character) {
            if(character) {
                if(this.Media?.characters?.edges.find(e => e.node.id === character)) {
                    this.modalData.show = true;
                    this.modalData.character = this.Media?.characters?.edges.find(e => e.node.id === character);
                }
            } else {
                this.modalData.show = false;
                this.modalData.character = false;
            }
        }
    }
});
</script>
