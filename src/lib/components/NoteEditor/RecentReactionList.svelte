<script lang="ts">
  import NoteListItem from '$lib/components/NoteListItem.svelte';
  import type RxNostrClient from '$lib/services/RxNostrClient';
  import type { NoteEditorStore } from '$lib/stores/noteEditor';

  export let editor: NoteEditorStore;
  export let client: RxNostrClient;

  const toggle = (noteId: string | undefined): void => {
    if (!noteId) {
      return;
    }
    if (isUsed(noteId)) {
      editor.removeNote(noteId);
    } else {
      editor.appendNote(noteId);
    }
  };
  const isUsed = (noteId: string | undefined): boolean =>
    !!$editor.notes.find((e) => e.noteId === noteId);
</script>

<div class="flex flex-col space-y-8">
  {#each $editor.searchedNotes as note (note.id)}
    <NoteListItem {note} {client}>
      <div slot="footer">
        <button
          type="button"
          class="btn ml-5"
          class:variant-filled-surface={isUsed(note.id)}
          class:variant-filled-primary={!isUsed(note.id)}
          on:click={() => toggle(note.id)}>{isUsed(note.id) ? 'Remove' : 'Add'}</button
        >
      </div>
    </NoteListItem>
  {/each}
</div>
