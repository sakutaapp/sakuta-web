<template>
    <Container>
        <anilist-gql-response>{{ Media }}</anilist-gql-response>
        <MediaHeader :media="Media" />
        <div class="flex flex-col md:flex-row md:space-x-3 space-y-4 md:space-y-0">
            <div class="w-full md:w-1/5 flex flex-col space-y-3">
                <Section class="flex md:flex-col md:space-y-2 space-x-5 md:space-x-0 overflow-x-scroll md:overflow-hidden">
                    <MediaProperty v-for="property in properties" :key="property.prop" :prop="property.prop" :value="property.value" />
                </Section>
                <Section class="overflow-x-scroll md:overflow-hidden">
                    <h2 class="text-lg font-semibold mb-1">{{ $t("media.section.genres") }}</h2>
                    <div class="flex md:flex-col space-x-1 md:space-x-0 md:space-y-1">
                        <Genre v-for="genre in genres" :key="genre" :text="genre" />
                    </div>
                </Section>
                <Section class="overflow-x-scroll md:overflow-hidden">
                    <h2 class="text-lg font-semibold mb-1">{{ $t("media.section.tags") }}</h2>
                    <div class="flex md:flex-col space-x-1 md:space-x-0 md:space-y-1">
                        <Genre v-for="tag in tags" :key="tag.id" :text="tag.name" :rank="tag.rank.toString()" />
                    </div>
                </Section>
                <Section class="hidden md:block">
                    <h2 class="text-lg font-semibold">{{ $t("media.section.trailer") }}</h2>
                    <iframe class="w-full" :src="`https://www.youtube-nocookie.com/embed/${trailer}`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </Section>
            </div>
            <div class="w-full md:w-4/5 flex flex-col space-y-3">
                <Section>
                    <h2 class="text-lg font-semibold">{{ $t("media.section.description") }}</h2>
                    <p v-html="description" />
                </Section>
                <Section>
                    <h2 class="text-lg font-semibold">{{ $t("media.section.characters") }}</h2>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
                        <CharacterCard v-for="character in characters" :key="character.id" :character="character" @open="modal(character.node.id)" />
                    </div>
                </Section>
                <Section v-if="episodes.length > 0">
                    <h2 class="text-lg font-semibold">{{ $t("media.section.episodes") }}</h2>
                    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 mt-2">
                        <EpisodeCard v-for="episode in episodes" :key="episode.title" :episode="episode" />
                    </div>
                </Section>
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
                    value: this.$i18n.t("media.length", [this.Media?.duration])
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
