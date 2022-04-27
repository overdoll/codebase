/**
 * @generated SignedSource<<f12c9aa6c426ab936942df898949a898>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeSeriesThumbnailFragment$data = {
  readonly id: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSeriesThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeSeriesThumbnailFragment";
};
export type ChangeSeriesThumbnailFragment = ChangeSeriesThumbnailFragment$data;
export type ChangeSeriesThumbnailFragment$key = {
  readonly " $data"?: ChangeSeriesThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSeriesThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeSeriesThumbnailFragment",
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ResourceIconFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeSeriesThumbnailFormFragment"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "d05047219f29b2c285a71634a80fac14";

export default node;
