class Example extends React.Component {
    constructor(props) {
        super(props);

        // You can only have one state variable
        this.state = {
            count: 0,
            isBorken: false,
        };
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                {/*
                    setState automatically merges update objects
                */}
                <button onClick={() => this.setState({
                    count: this.state.count + 1,
                    isBorken: this.state.count > 13,
                })}>
                    Click me
                </button>
                {isBorken && <p>Is borken.</p>}
            </div>
        );
    }
}