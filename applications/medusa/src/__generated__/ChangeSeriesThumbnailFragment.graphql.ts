/**
 * @generated SignedSource<<8fc9d0e750930fdf4f8b48ff8a269e67>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeSeriesThumbnailFragment$data = {
  readonly banner: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeSeriesThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeSeriesThumbnailFragment";
};
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
      "name": "banner",
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

(node as any).hash = "6af4b9a6e55a92a3f2ab17c17ae6fae9";

export default node;
