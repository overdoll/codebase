/**
 * @generated SignedSource<<096eb5457a381f98322baaf16816c12f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderClubJoinFragment$data = {
  readonly club: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"PostJoinClubFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubFragment">;
  readonly " $fragmentType": "PostHeaderClubJoinFragment";
};
export type PostHeaderClubJoinFragment$key = {
  readonly " $data"?: PostHeaderClubJoinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubJoinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderClubJoinFragment",
  "selections": [
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostJoinClubFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "44b1f15f16397ac7cb982257cbd83fc1";

export default node;
