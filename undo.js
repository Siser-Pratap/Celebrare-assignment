// UndoManager class to handle undo and redo functionality
class UndoManager {
    constructor() {
        this.stack = [];
        this.index = -1;
    }

    // Add an action to the undo stack
    add(action) {
        // Remove any actions that are ahead of the current index
        if (this.index < this.stack.length - 1) {
            this.stack = this.stack.slice(0, this.index + 1);
        }
        // Add the new action and increase the index
        this.stack.push(action);
        this.index++;
    }

    // Perform the undo action
    undo() {
        if (this.canUndo()) {
            const action = this.stack[this.index];
            action.undo();  // Execute the undo function
            this.index--;  // Move back in the stack
        }
    }

    // Perform the redo action
    redo() {
        if (this.canRedo()) {
            this.index++;  // Move forward in the stack
            const action = this.stack[this.index];
            action.redo();  // Execute the redo function
        }
    }

    // Check if we can undo
    canUndo() {
        return this.index >= 0;
    }

    // Check if we can redo
    canRedo() {
        return this.index < this.stack.length - 1;
    }
}
