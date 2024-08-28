type SignalParameters<T> = Parameters<
	T extends Array<unknown>
		? (...args: T) => never
		: T extends unknown
			? (argument: T) => never
			: () => never
>;

type SignalCallback<T> = (...args: SignalParameters<T>) => unknown;

type SignalWait<T> = T extends Array<unknown> ? LuaTuple<T> : T;

type RBXScriptSignalType<T> =
	T extends Array<unknown>
		? RBXScriptSignal<(...args: T) => void>
		: T extends unknown
			? RBXScriptSignal<(argument: T) => void>
			: RBXScriptSignal;

declare namespace Signal {
	interface Constructor {
		/** Constructs a new Signal. */

		Is: (object: unknown) => object is Signal<unknown>;

		/**
		 * Creates a new Signal that wraps around a native Roblox signal. The
		 * benefit.
		 *
		 * Of doing this is the ability to hook into Roblox signals and easily
		 * manage.
		 *
		 * Them in once place.
		 */

		new <T extends Array<unknown> | unknown = []>(): Signal<T>;

		/** Returns `true` if the given object is a Signal. */

		Wrap: <T extends Array<unknown> | unknown>(
			rbxScriptSignal: RBXScriptSignalType<T>,
		) => Signal<T>;
	}

	export interface Connection {
		/**
		 * If `true`, the connection is still connected. This field is
		 * read-only.
		 *
		 * To disconnect a connection, call the connection's `Disconnect()`
		 * method.
		 */

		readonly Connected: boolean;

		/** Disconnect the connection. */

		Destroy(): void;

		/** Alias for `Disconnect()`. */

		Disconnect(): void;
	}
}

interface Signal<T extends Array<unknown> | unknown> {
	//
	//
	// Connects a callback function to the signal. This callback function
	//
	// will be called any time the signal is fired.
	//
	//

	Connect(callback: SignalCallback<T>): Signal.Connection;

	/**
	 * Connects a callback function to the signal which will fire only.
	 *
	 * Once and then automatically disconnect itself.
	 */

	Destroy(): void;

	/** Fires the signal. */

	DisconnectAll(): void;

	/**
	 * Fires the signal using `task.defer` internally. This should only be.
	 *
	 * Used if `task.defer` is necessary, as the normal `Fire` method optimizes.
	 *
	 * For thread reuse internally.
	 */

	Fire(...args: SignalParameters<T>): void;

	//
	//
	// Yields the current thread until the signal fires. The arguments fired are
	//
	// returned.
	//
	//

	FireDeferred(...args: SignalParameters<T>): void;

	/** Disconnects all connections to the signal. */

	Once(callback: SignalCallback<T>): Signal.Connection;

	/** Destroys the signal. This is an alias for `Disconnect()`. */

	Wait(): SignalWait<T>;
}

//
//
// Signal class.
//
//

declare const Signal: Signal.Constructor;

export = Signal;
