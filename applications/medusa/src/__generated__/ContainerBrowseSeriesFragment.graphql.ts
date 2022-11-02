/**
 * @generated SignedSource<<3c8222b722fe9a1cbc0996ef382ca049>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerBrowseSeriesFragment$data = {
  readonly viewer: {
    readonly __typename: "Account";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollBrowseSeriesFragment">;
  readonly " $fragmentType": "ContainerBrowseSeriesFragment";
};
export type ContainerBrowseSeriesFragment$key = {
  readonly " $data"?: ContainerBrowseSeriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerBrowseSeriesFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerBrowseSeriesFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "viewer",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ScrollBrowseSeriesFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "bae104fb7b6f61265b586b80129a381f";

export default node;
