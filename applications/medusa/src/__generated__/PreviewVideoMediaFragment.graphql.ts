/**
 * @generated SignedSource<<2c2fa91113e8487f6d720c108e256ee7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewVideoMediaFragment$data = {
  readonly aspectRatio: {
    readonly height: number;
    readonly width: number;
  };
  readonly cover: {
    readonly " $fragmentSpreads": FragmentRefs<"BackgroundPosterImageMediaFragment" | "PosterImageMediaFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ContainersVideoMediaFragment">;
  readonly " $fragmentType": "PreviewVideoMediaFragment";
};
export type PreviewVideoMediaFragment$key = {
  readonly " $data"?: PreviewVideoMediaFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewVideoMediaFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewVideoMediaFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ImageMedia",
      "kind": "LinkedField",
      "name": "cover",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "BackgroundPosterImageMediaFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PosterImageMediaFragment"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AspectRatio",
      "kind": "LinkedField",
      "name": "aspectRatio",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ContainersVideoMediaFragment"
    }
  ],
  "type": "VideoMedia",
  "abstractKey": null
};

(node as any).hash = "1cf84f0a831faa75ad19c9357c2b0ac9";

export default node;
