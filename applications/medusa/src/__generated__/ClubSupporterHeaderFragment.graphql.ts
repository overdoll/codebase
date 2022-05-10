/**
 * @generated SignedSource<<6f40d2b723c8ff2660101b15e442d400>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubSupporterHeaderFragment$data = {
  readonly canSupport: boolean;
  readonly nextSupporterPostTime: any | null;
  readonly membersCount: number;
  readonly suspension: {
    readonly __typename: string;
  } | null;
  readonly " $fragmentType": "ClubSupporterHeaderFragment";
};
export type ClubSupporterHeaderFragment = ClubSupporterHeaderFragment$data;
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

(node as any).hash = "33ac668baeb2395d8b5abe1fa55e7b61";

export default node;
