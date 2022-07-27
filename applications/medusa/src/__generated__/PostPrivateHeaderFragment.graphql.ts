/**
 * @generated SignedSource<<450d9f629c18c940fa9f16a936ddec02>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPrivateHeaderFragment$data = {
  readonly club: {
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment" | "PostJoinClubFragment">;
  };
  readonly description: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionHeadingFragment" | "PostHeaderClubFragment">;
  readonly " $fragmentType": "PostPrivateHeaderFragment";
};
export type PostPrivateHeaderFragment$key = {
  readonly " $data"?: PostPrivateHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPrivateHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPrivateHeaderFragment",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubThumbnailFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostJoinClubFragment"
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostDescriptionHeadingFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "f7859edd54f7592bc4947e0516127808";

export default node;
