/**
 * @generated SignedSource<<afe6bcfb5bd520038ee0ccd51c51cda7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupporterHeaderFragment$data = {
  readonly canCreateSupporterOnlyPosts: boolean;
  readonly canSupport: boolean;
  readonly membersCount: number;
  readonly nextSupporterPostTime: any | null;
  readonly suspension: {
    readonly __typename: "ClubSuspension";
  } | null;
  readonly " $fragmentType": "ClubSupporterHeaderFragment";
};
export type ClubSupporterHeaderFragment$key = {
  readonly " $data"?: ClubSupporterHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupporterHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupporterHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canCreateSupporterOnlyPosts",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "canSupport",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nextSupporterPostTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "membersCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ClubSuspension",
      "kind": "LinkedField",
      "name": "suspension",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "72c849468728185ab3e98116ffff8042";

export default node;
