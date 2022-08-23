/**
 * @generated SignedSource<<cda30cc9e415e2ee4899c8e20f86f49f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLikeLoggedOutButtonFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentType": "PostLikeLoggedOutButtonFragment";
};
export type PostLikeLoggedOutButtonFragment$key = {
  readonly " $data"?: PostLikeLoggedOutButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeLoggedOutButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLikeLoggedOutButtonFragment",
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
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

(node as any).hash = "159d26e5ab2590d068d1d5760e33349c";

export default node;
