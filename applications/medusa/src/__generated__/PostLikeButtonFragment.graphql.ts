/**
 * @generated SignedSource<<ada853258b375741e3d0f7b77af8715d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLikeButtonFragment$data = {
  readonly club: {
    readonly slug: string;
  };
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeWrapperFragment">;
  readonly " $fragmentType": "PostLikeButtonFragment";
};
export type PostLikeButtonFragment$key = {
  readonly " $data"?: PostLikeButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostLikeButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLikeButtonFragment",
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeWrapperFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "98497dfc651158bb89b482ff58a0e521";

export default node;
