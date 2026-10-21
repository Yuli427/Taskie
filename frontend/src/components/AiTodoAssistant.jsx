function AiTodoAssistant({
  aiPrompt,
  setAiPrompt,
  isGenerating,
  handleGenerateTodo
}) {
  return (
    <div className="y2k-ai-card">
      <h3>✨ AI Assistant</h3>

      <p>
        Describe your task in natural language.
      </p>

      <textarea
        placeholder="Finish my CCNP lab tomorrow at 3 PM..."
        value={aiPrompt}
        onChange={(event) => setAiPrompt(event.target.value)}
      />

      <button
        type="button"
        className="y2k-button y2k-ai-button"
        onClick={handleGenerateTodo}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : '✨ Generate Todo'}
      </button>
    </div>
  )
}

export default AiTodoAssistant