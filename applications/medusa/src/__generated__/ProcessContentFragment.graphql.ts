/**
 * @generated SignedSource<<62cec36ab0ea15d0578b406efc4f8bbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProcessContentFragment$data = {
  readonly reference: string;
  readonly content: ReadonlyArray<{
    readonly processed: boolean;
  }>;
  readonly " $fragmentType": "ProcessContentFragment";
};
export type ProcessContentFragment = ProcessContentFragment$data;
export type ProcessContentFragment$key = {
  readonly " $data"?: ProcessContentFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProcessContentFragment">;
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

(node as any).hash = "bacc31f8b7304038514d4c8efac6120b";

export default node;
