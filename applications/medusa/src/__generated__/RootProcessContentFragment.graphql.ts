/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RootProcessContentFragment = {
    readonly reference: string;
    readonly content: ReadonlyArray<{
        readonly processed: boolean;
    }>;
    readonly " $refType": "RootProcessContentFragment";
};
export type RootProcessContentFragment$data = RootProcessContentFragment;
export type RootProcessContentFragment$key = {
    readonly " $data"?: RootProcessContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RootProcessContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RootProcessContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "processed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '8107c8d8b680c1dc7f801ab22b94bb20';
export default node;
