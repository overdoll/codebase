/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ProcessContentFragment = {
    readonly reference: string;
    readonly content: ReadonlyArray<{
        readonly processed: boolean;
    }>;
    readonly " $refType": "ProcessContentFragment";
};
export type ProcessContentFragment$data = ProcessContentFragment;
export type ProcessContentFragment$key = {
    readonly " $data"?: ProcessContentFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ProcessContentFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessContentFragment",
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
(node as any).hash = 'bacc31f8b7304038514d4c8efac6120b';
export default node;
