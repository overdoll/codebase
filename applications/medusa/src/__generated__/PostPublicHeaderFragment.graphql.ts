/**
 * @generated SignedSource<<810ce6918b0ecab8b38208479729e70d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPublicHeaderFragment$data = {
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment" | "PostJoinClubFragment">;
  };
  readonly description: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostDescriptionHeadingFragment" | "PostHeaderClubJoinFragment">;
  readonly " $fragmentType": "PostPublicHeaderFragment";
};
export type PostPublicHeaderFragment$key = {
  readonly " $data"?: PostPublicHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPublicHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPublicHeaderFragment",
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
          "name": "name",
          "storageKey": null
        },
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
          "name": "ClubThumbnailFragment"
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubJoinFragment"
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

(node as any).hash = "c02bd8954af0d657405e3446d4a65728";

export default node;
