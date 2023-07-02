export default function CreateStreamer({
  createStreamer,
  createForm,
  updateCreateFormField,
}) {
  return (
    <div>
      <h2>Create streamer</h2>
      <form onSubmit={createStreamer}>
        <input
          onChange={updateCreateFormField}
          value={createForm.name}
          name="name"
        />
        <textarea
          onChange={updateCreateFormField}
          value={createForm.description}
          name="description"
        />
        <select
          value={createForm.streamingPlatform}
          onChange={updateCreateFormField}
          name="streamingPlatform"
          required
        >
          <option disabled value="">
            Choose a platform
          </option>
          <option value="Twitch">Twitch</option>
          <option value="YouTube">YouTube</option>
          <option value="TikTok">TikTok</option>
          <option value="Kick">Kick</option>
          <option value="Rumble">Rumble</option>
        </select>
        <button type="submit">create streamer</button>
      </form>
    </div>
  );
}
