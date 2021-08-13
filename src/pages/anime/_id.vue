<template>
    <Container>
        <anilist-gql-response>{{ Media }}</anilist-gql-response>
        <MediaHeader :media="Media" />
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
                <MediaEpisodes :episodes="episodes" />
            </div>
        </div>
        <CharacterModal v-if="modalData.show && modalData.character" :character="modalData.character" @close="modal()" />
    </Container>
</template>


<script>
import anime from "../../apollo/queries/anime";
export default {
    apollo: {
        Media: {
            query: anime,
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
                    prop: "season",
                    value: this.$i18n.t("media.season", { season: this.$i18n.t(`media.season.${this.Media?.season}`), year: this.Media?.seasonYear }),
                },
                {
                    prop: "length",
                    value: this.$i18n.tc("media.length", this.Media?.duration, [this.Media?.duration])
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
};
</script>
