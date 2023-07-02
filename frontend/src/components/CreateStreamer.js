import authStore from "../stores/authStore";

export default function CreateStreamer({
  createStreamer,
  createForm,
  updateCreateFormField,
}) {
  const store = authStore();
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-10">Create streamer</h2>
      <form onSubmit={createStreamer} className="flex flex-col gap-4">
        <input
          onChange={updateCreateFormField}
          value={createForm.name}
          name="name"
          className="input input-bordered w-full max-w-xs"
          placeholder="streamer name"
        />
        <textarea
          onChange={updateCreateFormField}
          value={createForm.description}
          name="description"
          className="input input-bordered w-full max-w-xs"
          placeholder="streamer description"
        />
        <select
          value={createForm.streamingPlatform}
          onChange={updateCreateFormField}
          name="streamingPlatform"
          required
          className="select select-bordered w-full max-w-xs"
        >
          <option disabled selected value="">
            Choose a platform
          </option>
          <option value="Twitch">Twitch</option>
          <option value="YouTube">YouTube</option>
          <option value="TikTok">TikTok</option>
          <option value="Kick">Kick</option>
          <option value="Rumble">Rumble</option>
        </select>
        <button
          type="submit"
          className="btn btn-outline btn-warning"
          disabled={store.loggedIn ? false : true}
        >
          {store.loggedIn ? "create streamer" : "login to create streamer"}
        </button>
      </form>
    </div>
  );
}
