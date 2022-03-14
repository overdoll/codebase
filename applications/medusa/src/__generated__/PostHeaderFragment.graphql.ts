/**
 * @generated SignedSource<<bc18fe61b1b62ef3950f3a1eb2082deb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderFragment$data = {
  readonly club: {
    readonly viewerMember: {
      readonly isSupporter: boolean;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonClubFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderClubFragment">;
  readonly " $fragmentType": "PostHeaderFragment";
};
export type PostHeaderFragment = PostHeaderFragment$data;
export type PostHeaderFragment$key = {
  readonly " $data"?: PostHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderFragment",
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
          "concreteType": "ClubMember",
          "kind": "LinkedField",
          "name": "viewerMember",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "isSupporter",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "JoinClubButtonClubFragment"
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

(node as any).hash = "551631d604b954794edc3d4ddcdf3ba6";

export default node;
