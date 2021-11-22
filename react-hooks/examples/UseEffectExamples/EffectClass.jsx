class DefaultExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    
    // Duplicated code!
    // These to Lifecycle Functions block the browser from
    // updating the screen.
    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }
    
    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        );
    }
}

/* ---------------------------------------------------------------------------------------- */

// Class Component with Clean-Up
// If friend-prop changes when the component on the screen the wrong status will be shown.
// Will also cause a memory leak or crash as unsubscribe will use the wrong friend ID.
// Requires componentDidUpdate.
class FriendStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }
    
    componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }
    // componentDidUpdate will be needed to avoid bugs!
    // Often forgotten in these implementations.
    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }
    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        });
    }
  
    render() {
        if (this.state.isOnline === null) {
            return 'Loading...';
        }
      
        return this.state.isOnline ? 'Online' : 'Offline';
    }
}

/* ---------------------------------------------------------------------------------------- */

// Class Component with Many Concerns
class FriendStatusWithCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0, isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }
    
    // Unrelated logic in the same lifecycles.
    // Related logic separated.
    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }
    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }
    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }
    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        });
    }
  
    render() {
        if (this.state.isOnline === null) {
            return 'Loading...';
        }
      
        return this.state.isOnline ? 'Online' : 'Offline';
    }
}

/* ---------------------------------------------------------------------------------------- */

class SkippingEventsExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    
    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }
    componentDidUpdate(previousProps, previousState) {
        if (previousState.count !== this.state.count) {
            document.title = `You clicked ${this.state.count} times`;
        }
    }
    
    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        );
    }
}