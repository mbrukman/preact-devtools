import { h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { getRootDomNode } from "./utils";

export interface Props {
	onClick: () => void;
	children: any;
	class?: string;
	style?: string | Record<string, any>;
}

export function OutsideClick(props: Props) {
	let ref = useRef<HTMLDivElement>();

	useEffect(() => {
		if (!ref.current) return;

		let listener = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as any)) {
				props.onClick();
			}
		};

		let root = getRootDomNode(ref.current!);
		root.addEventListener("click", listener);
		return () => root.removeEventListener("click", listener);
	}, [props.children, ref.current]);

	return (
		<div ref={ref} class={props.class} style={props.style}>
			{props.children}
		</div>
	);
}
