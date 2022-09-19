/**
 * @generated SignedSource<<50c6637e6b3946eae98e396a3d39e0e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TopicIconFragment$data = {
  readonly bannerMedia: {
    readonly " $fragmentSpreads": FragmentRefs<"IconMediaFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "TopicIconFragment";
};
export type TopicIconFragment$key = {
  readonly " $data"?: TopicIconFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TopicIconFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TopicIconFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "bannerMedia",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "IconMediaFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "c9325e3c21e10db5708f16bc6eeac1d8";

export default node;
