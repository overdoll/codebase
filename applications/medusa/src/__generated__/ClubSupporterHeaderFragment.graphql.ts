/**
 * @generated SignedSource<<4dbae04d943759c258c6c1c90a7851f1>>
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
