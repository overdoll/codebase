/**
 * @generated SignedSource<<c4209bbedc953c356736d17cd455e5ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceThumbnailFragment$data = {
  readonly id: string;
  readonly thumbnail: {
    readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeAudienceThumbnailFragment";
};
export type ChangeAudienceThumbnailFragment = ChangeAudienceThumbnailFragment$data;
export type ChangeAudienceThumbnailFragment$key = {
  readonly " $data"?: ChangeAudienceThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceThumbnailFragment",
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
      "name": "ChangeAudienceThumbnailFormFragment"
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "f76c7c089ffb0c32c79b650b65b1ee43";

export default node;
