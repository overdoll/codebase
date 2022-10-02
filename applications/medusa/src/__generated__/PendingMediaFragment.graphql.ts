/**
 * @generated SignedSource<<44aa62bd49fe4281fb5de2468d5e9ea7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PendingMediaFragment$data = {
  readonly characters: ReadonlyArray<{
    readonly name: string;
  }>;
  readonly " $fragmentType": "PendingMediaFragment";
};
export type PendingMediaFragment$key = {
  readonly " $data"?: PendingMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PendingMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PendingMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Character",
      "kind": "LinkedField",
      "name": "characters",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "8b8fd5fc872ba3864386f354a85b70d5";

export default node;
