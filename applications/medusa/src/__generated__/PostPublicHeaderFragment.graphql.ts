/**
 * @generated SignedSource<<9ba9d4b6b2fdc622d109cef6781478f6>>
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
  readonly reference: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
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

(node as any).hash = "1d354c17b74c057bfdf879cd14500e95";

export default node;
