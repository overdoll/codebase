/**
 * @generated SignedSource<<98f9a6b33d90fdd05662a77475804a77>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NoPostsPlaceholderFragment$data = {
  readonly moderatorSettings: {
    readonly isInModeratorQueue: boolean;
  };
  readonly " $fragmentType": "NoPostsPlaceholderFragment";
};
export type NoPostsPlaceholderFragment$key = {
  readonly " $data"?: NoPostsPlaceholderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NoPostsPlaceholderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoPostsPlaceholderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ModeratorSettings",
      "kind": "LinkedField",
      "name": "moderatorSettings",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInModeratorQueue",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "84d992e4be3665379fff6f8f0bab44c5";

export default node;
