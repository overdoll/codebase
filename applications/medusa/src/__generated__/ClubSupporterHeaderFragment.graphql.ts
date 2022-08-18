/**
 * @generated SignedSource<<b84741884a759f3856bb54995a8e0a17>>
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
  readonly membersIsSupporterCount: number;
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
      "name": "membersIsSupporterCount",
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

(node as any).hash = "d3c6516edac9e3f091b60ef593f93e8f";

export default node;
