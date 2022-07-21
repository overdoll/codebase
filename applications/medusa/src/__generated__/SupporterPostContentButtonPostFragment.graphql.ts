/**
 * @generated SignedSource<<d1afca60f920b4ddb7bbc3bf8d9c527f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SupporterPostContentButtonPostFragment$data = {
  readonly club: {
    readonly canCreateSupporterOnlyPosts: boolean;
  };
  readonly id: string;
  readonly " $fragmentType": "SupporterPostContentButtonPostFragment";
};
export type SupporterPostContentButtonPostFragment$key = {
  readonly " $data"?: SupporterPostContentButtonPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupporterPostContentButtonPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupporterPostContentButtonPostFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "canCreateSupporterOnlyPosts",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "ebfa0efc9530caf5c25b1dc478369edb";

export default node;
