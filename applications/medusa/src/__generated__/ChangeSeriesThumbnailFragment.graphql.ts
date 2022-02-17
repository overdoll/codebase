/**
 * @generated SignedSource<<0c27527d2cdad79b597998ccbe866aa8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeSeriesThumbnailFragment$data = {
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

(node as any).hash = "04221ae5b0fa862aaccf25accc6527e8";

export default node;
